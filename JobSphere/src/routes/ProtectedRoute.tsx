import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

interface Props {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
	const { user } = useAppSelector((s) => s.auth);
	if (!user) {
		return <Navigate to={"/auth/signup"} replace />;
	}
	return <>{children}</>;
};

export default ProtectedRoute;
