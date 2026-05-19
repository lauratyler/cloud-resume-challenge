provider "aws" {
  region = "us-east-2"
}

resource "aws_dynamodb_table" "visitor_count" {
  name         = "VisitorCount"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_iam_role" "lambda_role" {
  name = "visitor-counter-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_policy" "dynamodb_policy" {
  name = "VisitorCountDynamoPolicy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "dynamodb:UpdateItem",
        "dynamodb:GetItem"
      ]
      Resource = aws_dynamodb_table.visitor_count.arn
    }]
  })
}

resource "aws_iam_role_policy_attachment" "attach_policy" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.dynamodb_policy.arn
}

resource "aws_lambda_function" "visitor_lambda" {
  function_name = "visitor-counter"
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.handler"
  runtime       = "nodejs18.x"

  filename         = "${path.module}/lambda/visitorCountLambda.zip"
  source_code_hash = filebase64sha256("${path.module}/lambda/visitorCountLambda.zip")
}

resource "aws_apigatewayv2_api" "http_api" {
  name          = "portfolio-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["https://lauratyler.dev", "http://localhost:5173"]
    allow_methods = ["GET", "POST"]
    allow_headers = ["Content-Type"]
  }
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.visitor_lambda.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "get_count" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /visitor-count"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_route" "increase_count" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /visitor-count"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_lambda_permission" "api_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.visitor_lambda.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*"
}

resource "aws_s3_bucket" "portfolio_bucket" {
  bucket = "lauratyler-prod-portfolio-997688109736"
}

resource "aws_apigatewayv2_route" "get_docs" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /docs/resume.pdf"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_iam_policy" "s3_policy" {
  name = "PortfolioBucketReadPolicy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["s3:GetObject"]
      Resource = "arn:aws:s3:::lauratyler-prod-portfolio-997688109736/docs/resume.pdf"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "attach_s3_policy" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.s3_policy.arn
}


resource "aws_acm_certificate" "api_cert" {
  domain_name       = "api.lauratyler.dev"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "api_cert" {
  certificate_arn         = aws_acm_certificate.api_cert.arn
  validation_record_fqdns = [for r in aws_acm_certificate.api_cert.domain_validation_options : r.resource_record_name]
}

resource "aws_apigatewayv2_domain_name" "api_domain" {
  domain_name = "api.lauratyler.dev"

  domain_name_configuration {
    certificate_arn = aws_acm_certificate.api_cert.arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }

  depends_on = [aws_acm_certificate_validation.api_cert]
}

resource "aws_apigatewayv2_api_mapping" "api_mapping" {
  api_id      = aws_apigatewayv2_api.http_api.id
  domain_name = aws_apigatewayv2_domain_name.api_domain.id
  stage       = aws_apigatewayv2_stage.default.id
}
