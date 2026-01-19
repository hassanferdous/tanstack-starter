Welcome to your new TanStack app!

# Getting Started

To run this application:

```bash
npm install
npm run dev
```

# Building For Production

To build this application for production:

```bash
npm run build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
npm run test
```

## Styling

This project uses Tailwind CSS and Shadcn UI for styling.

## Routing

This project uses [TanStack Router](https://tanstack.com/router) with **File-Based Routing**.

Routes are automatically generated based on the file structure in the `src/routes` directory.

### Adding A Route

To add a new route, simply create a new file in the `src/routes` directory.

For example, to create an `/about` route, create a file at `src/routes/about.tsx`:

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: About,
});

function About() {
	return <div>About Page</div>;
}
```

The route tree is automatically generated in `src/routeTree.gen.ts` when you save the file (ensure the dev server is running or the watcher is active).

### Route Groups

This project utilizes route groups (folders starting with `_`) to organize routes without affecting the URL structure, or to apply layouts.

- `src/routes/_app`: Main application layout.
- `src/routes/_admin`: Admin section layout.
- `src/routes/_auth`: Authentication layout.

For more information, check out the [File Based Routing](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing) documentation.

## Data Fetching

This project uses [TanStack Query](https://tanstack.com/query) for data fetching.

### Using React-Query

You can use `useQuery` to fetch your data.

```tsx
import { useQuery } from "@tanstack/react-query";

function App() {
	const { data } = useQuery({
		queryKey: ["people"],
		queryFn: () =>
			fetch("https://swapi.dev/api/people")
				.then((res) => res.json())
				.then((data) => data.results),
		initialData: [],
	});

	return (
		<div>
			<ul>
				{data.map((person) => (
					<li key={person.name}>{person.name}</li>
				))}
			</ul>
		</div>
	);
}
```

## State Management

This project uses [Zustand](https://github.com/pmndrs/zustand) or [TanStack Store](https://tanstack.com/store) for state management.

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).
