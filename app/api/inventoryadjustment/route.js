import { NextResponse } from "next/server";

// Helper function to handle JSON responses
const createResponse = (message, status, data = null) => {
    const response = { message };
    if (data) response.data = data;
    return NextResponse.json(response, { status });
};

export const POST = async (request) => {
    try {
        const data = await request.json();

        // Optional logging, can be removed for production
        console.debug("Request Data:", data);

        // Check if data is valid (you can add more validation here as needed)
        if (!data) {
            return createResponse("No data provided.", 400);
        }

        return createResponse("Data received successfully.", 200, data);
    } catch (error) {
        console.error("Error processing request:", error);
        return createResponse("Failed to create adjustments", 500, error.message || error);
    }
};
