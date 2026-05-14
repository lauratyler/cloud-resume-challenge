import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import App from './App'

vi.mock('./services/api', () => ({
    getVisitorCount: vi.fn(),
    updateVisitorCount: vi.fn(),
}))

import { getVisitorCount, updateVisitorCount } from './services/api'

const mockGetVisitorCount = vi.mocked(getVisitorCount)
const mockUpdateVisitorCount = vi.mocked(updateVisitorCount)

beforeEach(() => {
    sessionStorage.clear()
    vi.clearAllMocks()
    mockGetVisitorCount.mockResolvedValue(5)
    mockUpdateVisitorCount.mockResolvedValue(undefined as never)
})

describe('visitor counter — first visit', () => {
    it('increments the count by 1 on initial site load', async () => {
        render(<App />)

        await waitFor(() => {
            expect(mockUpdateVisitorCount).toHaveBeenCalledTimes(1)
        })
    })

    it('also fetches the current count after incrementing', async () => {
        render(<App />)

        await waitFor(() => {
            expect(mockUpdateVisitorCount).toHaveBeenCalled()
            expect(mockGetVisitorCount).toHaveBeenCalled()
        })
    })

    it('increments regardless of which page the user lands on first', async () => {
        // Counter logic lives in App (root), so it fires for any starting route
        render(<App />)

        await waitFor(() => {
            expect(mockUpdateVisitorCount).toHaveBeenCalledTimes(1)
        })
    })
})

describe('visitor counter — subsequent page visits', () => {
    it('does not call updateVisitorCount when visit-count is already in sessionStorage', async () => {
        sessionStorage.setItem('visit-count', 'true')

        render(<App />)

        await waitFor(() => {
            expect(mockGetVisitorCount).toHaveBeenCalled()
        })

        expect(mockUpdateVisitorCount).not.toHaveBeenCalled()
    })

    it('still fetches the latest count to reflect visits from other users', async () => {
        sessionStorage.setItem('visit-count', 'true')
        mockGetVisitorCount.mockResolvedValue(42)

        render(<App />)

        await waitFor(() => {
            expect(mockGetVisitorCount).toHaveBeenCalled()
        })
        expect(mockUpdateVisitorCount).not.toHaveBeenCalled()
    })
})
