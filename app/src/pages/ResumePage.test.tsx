import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import ResumePage from './ResumePage'

vi.mock('../services/api', () => ({
    getResume: vi.fn(),
    getVisitorCount: vi.fn(),
    updateVisitorCount: vi.fn(),
}))

import { getResume, getVisitorCount } from '../services/api'
const mockGetResume = vi.mocked(getResume)
const mockGetVisitorCount = vi.mocked(getVisitorCount)

const mockBlob = new Blob(['%PDF'], { type: 'application/pdf' })
const fakeUrl = 'blob:http://localhost/fake-pdf'

beforeEach(() => {
    vi.clearAllMocks()
    URL.createObjectURL = vi.fn().mockReturnValue(fakeUrl)
    URL.revokeObjectURL = vi.fn()
    mockGetVisitorCount.mockResolvedValue(0)
})

describe('ResumePage', () => {
    it('shows download link after PDF loads', async () => {
        mockGetResume.mockResolvedValue(mockBlob)
        render(<ResumePage />)
        const link = await screen.findByRole('link', { name: /download pdf/i })
        expect(link).toHaveAttribute('href', fakeUrl)
    })

    it('shows error state when getResume fails', async () => {
        mockGetResume.mockRejectedValue(new Error('S3 error'))
        render(<ResumePage />)
        await waitFor(() => {
            expect(screen.queryByRole('link', { name: /download pdf/i })).not.toBeInTheDocument()
        })
        // adjust selector to match your actual error UI
        expect(screen.getByText(/could not load resume/i)).toBeInTheDocument()
    })

    it('does not show download link while loading', () => {
        mockGetResume.mockReturnValue(new Promise(() => {})) // never resolves
        render(<ResumePage />)
        expect(screen.queryByRole('link', { name: /download pdf/i })).not.toBeInTheDocument()
    })
})
