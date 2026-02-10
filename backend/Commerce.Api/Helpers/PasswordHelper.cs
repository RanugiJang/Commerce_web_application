// Required namespaces for cryptography and string encoding
using System.Security.Cryptography;
using System.Text;

namespace Commerce.Api.Helpers;

// This helper class is responsible for handling password hashing
// We DO NOT store plain text passwords in the database
public static class PasswordHelper
{
    // This method converts a plain password into a hashed value
    public static string Hash(string password)
    {
        // Create a SHA256 hashing object
        // SHA256 is a one-way hashing algorithm
        using var sha = SHA256.Create();

        // Convert the password string into bytes using UTF-8 encoding
        byte[] passwordBytes = Encoding.UTF8.GetBytes(password);

        // Compute the hash from the password bytes
        byte[] hashBytes = sha.ComputeHash(passwordBytes);

        // Convert hashed bytes into a readable Base64 string
        // This is what we store in the database
        return Convert.ToBase64String(hashBytes);
    }

    // This method checks whether the entered password matches the stored hash
    public static bool Verify(string password, string storedHash)
    {
        // Hash the entered password again
        string hashedInputPassword = Hash(password);

        // Compare the newly generated hash with the stored hash
        return hashedInputPassword == storedHash;
    }
}
