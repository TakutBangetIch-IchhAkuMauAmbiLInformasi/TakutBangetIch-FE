import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const paperId = params.id    // Make a request to the backend API
    const backendUrl = process.env.NEXT_PUBLIC_SEARCH_ENGINE_URL || 'http://localhost:8000'
    const response = await fetch(`${backendUrl}/api/v1/paper/${paperId}/insights`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Backend error:', errorData)
      return NextResponse.json(
        { error: 'Failed to generate insights' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Error generating insights:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
