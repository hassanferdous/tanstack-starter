import { axiosInstance } from "@/lib/axios";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const { postId } = params;
		const { data } = await axiosInstance.get(`/posts/${postId}`);
		return { data };
	},
	pendingComponent: () => {
		return <div>Loading...</div>;
	},
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
		};
	},
});

function RouteComponent() {
	const { postId } = Route.useParams();
	const { data } = Route.useLoaderData();
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
	);
}
