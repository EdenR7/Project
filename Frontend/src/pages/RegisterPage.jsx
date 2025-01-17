import { Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SnackBarContext } from "@/context/SnackBarContext";
import { IconInput, Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AUTH_URL } from "@/components/general/AuthLayout";
import api from "@/services/api.service";

function RegisterPage() {
  const navigate = useNavigate();
  const [displayPassword, setDisplayPassword] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const { displaySnackBar } = useContext(SnackBarContext);

  function handleInputChange(ev) {
    setNewUser((prev) => {
      return {
        ...prev,
        [ev.target.name]: ev.target.value,
      };
    });
  }

  async function handleCreateNewUser(ev) {
    ev.preventDefault();
    try {
      await api.post(AUTH_URL + "register", newUser);
      navigate("/auth");
      displaySnackBar({
        label: "You registered successfully",
      });
    } catch (err) {
      console.log(err);
      displaySnackBar({
        label: "Error in register proccess!",
        context:
          err.response.data.error === "User already exists" &&
          "Sorry, username already exists",
        closeManually: true,
        type: "danger",
      });
    }
  }

  return (
    <>
      <form className=" flex flex-col gap-3" onSubmit={handleCreateNewUser}>
        <Input
          value={newUser.firstName}
          onChange={handleInputChange}
          type="text"
          placeholder="First Name"
          name="firstName"
          required
        />
        <Input
          value={newUser.lastName}
          onChange={handleInputChange}
          type="text"
          placeholder="Last Name"
          name="lastName"
          required
        />
        <IconInput
          Icon={User}
          value={newUser.username}
          onChange={handleInputChange}
          type="text"
          placeholder="Username"
          name="username"
          required
        />
        <IconInput
          Icon={Mail}
          value={newUser.email}
          onChange={handleInputChange}
          type="email"
          placeholder="Email"
          name="email"
          required
        />
        <div className="relative">
          <IconInput
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            Icon={LockKeyhole}
            placeholder="Password"
            type={`${displayPassword ? "text" : "password"}`}
            required
          />
          <button
            type="button"
            className=" absolute top-3 right-3 text-gray-400"
            onClick={() => {
              setDisplayPassword((prev) => !prev);
            }}
          >
            {displayPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <p className=" text-xs mx-auto">
          Alredy have an account?{" "}
          <Link to={"/auth"} className=" font-semibold text-primary" href="#">
            Sign Up!
          </Link>
        </p>
        <Button className="block w-full">Create Account</Button>
      </form>
    </>
  );
}

export default RegisterPage;
