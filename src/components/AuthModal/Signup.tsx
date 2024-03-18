import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "../../common/useAuth";

interface Props {
  onClose: () => void;
}

const Signup: React.FC<Props> = ({ onClose }) => {
  const { signup, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isPasswordMatch = password === confirmPassword;
  const isSubmitDisabled = useMemo(() => {
    const validations = [!!email, !!password, isPasswordMatch, !isLoading];
    return validations.includes(false);
  }, [email, isLoading, isPasswordMatch, password]);

  const onSubmitSignup = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isSubmitDisabled) {
        return;
      }
      setError("");
      setIsLoading(true);
      const result = await signup(email, password);
      if (!result.success && result.error) {
        setError(result.error);
      }
      setIsLoading(false);
    },
    [email, isSubmitDisabled, password, signup]
  );

  useEffect(() => {
    if (user) {
      onClose();
    }
  }, [onClose, user]);

  return (
    <form onSubmit={onSubmitSignup}>
      <DialogTitle>Create a new account.</DialogTitle>
      <DialogContent className="w-[75vw] md:w-[500px] lg:w-[500px] xl:w-[500px] 2xl:w-[500px] grid">
        <TextField
          margin="dense"
          label="Email Address"
          type="email"
          variant="standard"
          disabled={isLoading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          variant="standard"
          disabled={isLoading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          error={!isPasswordMatch}
          helperText={!isPasswordMatch && "Passwords do not match"}
          margin="dense"
          label="Confirm Password"
          type="password"
          variant="standard"
          disabled={isLoading}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {/* Hack so that helper text doesnt change dialog size */}
        <div className={isPasswordMatch ? "h-[23px]" : ""}></div>
        {!isPasswordMatch ? (
          <div className="absolute text-red-600 text-xs mt-[-5px]">{error}</div>
        ) : (
          <div className="absolute text-red-600 text-xs mt-[-23px]">
            {error}
          </div>
        )}
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
            onSubmit={onSubmitSignup}
          >
            Signup
          </LoadingButton>
        </DialogActions>
      </div>
    </form>
  );
};

export default Signup;
