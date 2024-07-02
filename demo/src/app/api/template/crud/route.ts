import { NextRequest } from "next/server";
import prisma from "../../components/prisma";

/**
 * Handles the POST request to create a new user.
 *
 * @param req - The NextRequest object representing the incoming request.
 * @returns A Response object indicating the success of the operation.
 */
export async function POST(req: NextRequest) {
  const { name, email, age } = await req.json();

  await prisma.user.create({
    data: {
      name: name,
      email: email,
      age: parseInt(age),
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
  });

  return new Response("User Created");
}

/**
 * Handles the GET request to retrieve a user by email.
 *
 * @param req - The Request object representing the incoming request.
 * @returns A Response object containing the user information in JSON format.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  const user = await prisma.user.findUnique({
    where: {
      email: email as string,
    },
    include: {
      userPreference: {
        select: {
          emailUpdates: true,
        },
      },
    },
  });

  return new Response(JSON.stringify(user));
}

/**
 * Handles the PATCH request to update a user's email.
 *
 * @param req - The NextRequest object representing the incoming request.
 * @returns A Response object indicating the success of the operation.
 */
export async function PATCH(req: NextRequest) {
  const { oldEmail, newEmail } = await req.json();

  await prisma.user.update({
    where: {
      email: oldEmail,
    },
    data: {
      email: newEmail,
    },
  });

  return new Response("User Updated");
}

/**
 * Handles the DELETE request to delete a user by email.
 *
 * @param req - The NextRequest object representing the incoming request.
 * @returns A Response object indicating the success of the operation.
 */
export async function DELETE(req: NextRequest) {
  const { email } = await req.json();

  await prisma.user.delete({
    where: {
      email: email,
    },
  });

  return new Response("DELETE Request");
}
