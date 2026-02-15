using System.Security.Cryptography;
using System.Text;

namespace Commerce.Api.Helpers; //Helper class for password hashing and verification, it uses SHA256 to hash passwords and provides a method to verify a password against a hash

public static class PasswordHelper      //static class for password hashing and verification, it uses SHA256 to hash passwords and provides a method to verify a password against a hash
{
    public static string Hash(string password)
    {
        using var sha = SHA256.Create();
        var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(bytes); //returns the hashed password as a base64 string
    }

    public static bool Verify(string password, string hash)
        => Hash(password) == hash;
}
