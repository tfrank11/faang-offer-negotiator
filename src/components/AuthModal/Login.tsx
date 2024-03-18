import { useCallback, useEffect, useMemo, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useAuth } from "../../common/useAuth";

interface Props {
  onClose: () => void;
}

const Login: React.FC<Props> = ({ onClose }) => {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isSubmitDisabled = useMemo(() => {
    const validations = [!!email, !!password, !isLoading];
    return validations.includes(false);
  }, [email, isLoading, password]);

  const onSubmitLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isSubmitDisabled) {
        return;
      }
      setError("");
      setIsLoading(true);
      const result = await login(email, password);
      if (!result.success && result.error) {
        setError(result.error);
      }
      setIsLoading(false);
    },
    [email, isSubmitDisabled, login, password]
  );

  useEffect(() => {
    if (user) {
      onClose();
    }
  }, [onClose, user]);

  return (
    <form onSubmit={onSubmitLogin}>
      <DialogTitle>Login to your account.</DialogTitle>
      <DialogContent className="w-[75vw] md:w-[500px] lg:w-[500px] xl:w-[500px] 2xl:w-[500px] grid">
        <TextField
          margin="dense"
          label="Email Address"
          type="email"
          variant="standard"
          value={email}
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          variant="standard"
          value={password}
          disabled={isLoading}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="absolute text-red-600 text-xs mt-4">{error}</div>
      </DialogContent>
      <div className="absolute right-10 bottom-8">
        <DialogActions>
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            disabled={isSubmitDisabled}
            loading={isLoading}
            onClick={onSubmitLogin}
          >
            Login
          </LoadingButton>
        </DialogActions>
      </div>
    </form>
  );
};

export default Login;
