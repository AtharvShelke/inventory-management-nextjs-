import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export class ApiError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = 'ApiError';
  }
}

export function handleApiError(error) {
  console.error('API Error:', {
    name: error.name,
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  });

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const formattedErrors = error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));

    return NextResponse.json(
      {
        success: false,
        error: 'Validation failed',
        details: formattedErrors,
      },
      { status: 400 }
    );
  }

  // Handle custom API errors
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: error.details,
      },
      { status: error.statusCode }
    );
  }

  // Handle Prisma errors
  if (error.code) {
    const prismaErrors = {
      P2002: {
        message: 'A record with this unique field already exists',
        status: 409,
      },
      P2003: {
        message: 'Foreign key constraint failed',
        status: 400,
      },
      P2025: {
        message: 'Record not found',
        status: 404,
      },
      P2014: {
        message: 'Invalid relationship reference',
        status: 400,
      },
    };

    const prismaError = prismaErrors[error.code];
    if (prismaError) {
      return NextResponse.json(
        {
          success: false,
          error: prismaError.message,
          details: error.meta,
        },
        { status: prismaError.status }
      );
    }
  }

  // Generic error
  return NextResponse.json(
    {
      success: false,
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    },
    { status: 500 }
  );
}
