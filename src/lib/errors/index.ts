import { NextResponse } from "next/server"
import { ZodError } from "zod"
import { Prisma } from "@prisma/client"

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
  ) {
    super(message)
    this.name = "AppError"
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: "ValidationError",
        message: "Invalid request data",
        details: error.issues.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      },
      { status: 400 },
    )
  }

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: error.code ?? "AppError",
        message: error.message,
      },
      { status: error.statusCode },
    )
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Conflict", message: "Resource already exists" },
        { status: 409 },
      )
    }
    return NextResponse.json(
      { error: "DatabaseError", message: "A database error occurred" },
      { status: 500 },
    )
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return NextResponse.json(
      { error: "DatabaseError", message: "Invalid database query" },
      { status: 500 },
    )
  }

  console.error("Unhandled API error:", error)
  return NextResponse.json(
    { error: "InternalError", message: "An unexpected error occurred" },
    { status: 500 },
  )
}

export function notFound(message = "Resource not found") {
  return new AppError(404, message, "NotFound")
}

export function badRequest(message: string) {
  return new AppError(400, message, "BadRequest")
}

export function conflict(message: string) {
  return new AppError(409, message, "Conflict")
}
