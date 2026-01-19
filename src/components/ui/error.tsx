import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export default function ErrorComponent({
	error,
	reset,
}: {
	error: any;
	reset: () => void;
}) {
	const router = useRouter();
	const queryErrorResetBoundary = useQueryErrorResetBoundary();

	useEffect(() => {
		// Reset the query error boundary
		queryErrorResetBoundary.reset();
	}, [queryErrorResetBoundary]);

	return (
		<div className="container">
			<div className="flex flex-col items-center justify-center p-6 space-y-4 border border-red-200 bg-red-50 rounded-md">
				<span className="text-red-700 font-medium">{error.message}</span>
				<button
					className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
					onClick={() => {
						// Invalidate the route to reload the loader, and reset any router error boundaries
						router.invalidate();
					}}>
					Retry
				</button>
			</div>
		</div>
	);
}
