import ErrorComponent from "@/components/ui/error";
import { axiosInstance } from "@/lib/axios";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_app/posts/$postId")({
	head: ({ loaderData }) => {
		const data = (loaderData as any).data;

		return {
			meta: [
				{
					title: data.title,
				},
				{
					name: "description",
					content: data.body,
				},
			],
		}
	},
	loader: async ({ params, context }) => {
		const { postId } = params;
		return context.queryClient.ensureQueryData({
			queryKey: ["posts", postId],
			queryFn: async () => {
				const res = await axiosInstance.get(`/posts/${postId}`);
				return res.data;
			},
			staleTime: 10000,
		})
	},
	pendingComponent: () => {
		return <div>Loading...</div>;
	},
	errorComponent: ErrorComponent,
	component: RouteComponent,
});

function RouteComponent() {
	const { postId } = Route.useParams();
	const data = Route.useLoaderData();
	return (
		<div>
			<div className="max-w-3xl mx-auto p-8">
				<h1 className="text-4xl font-bold mb-4 text-gray-900 capitalize">
					{data.title}
				</h1>
				<hr className="my-6 border-gray-200" />
				<div className="prose prose-lg">
					<p className="text-xl text-gray-700 leading-relaxed">
						{data.body}
					</p>
				</div>
				<div className="mt-12 pt-6 border-t border-gray-100">
					<p className="text-sm text-gray-400">
						Post reference: <span className="font-mono">{postId}</span>
					</p>
				</div>
			</div>
		</div>
	)
}
