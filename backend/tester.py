from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

hashed = pwd_context.hash("raj")
print("Hashed:", hashed)

print("Verify correct password:", pwd_context.verify("raj", hashed))   # True
print("Verify wrong password:", pwd_context.verify("wrong", hashed))  # False
