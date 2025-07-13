import { useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
}

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Placeholder for real auth logic, e.g., Firebase listener
    const mockUser: User = {
      id: "123",
      email: "user@example.com",
    };
    // setUser(mockUser);
  }, []);

  return { user };
}
