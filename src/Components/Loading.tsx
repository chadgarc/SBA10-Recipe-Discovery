import { PacmanLoader } from "react-spinners";

/**
 * A reusable loading spinner component that displays a PacmanLoader
 * centered on the screen. Use this component whenever data is being fetched.
 *
 * @example
 * {loading && <Loading />}
 */
export function Loading() {
    return <div className="flex justify-center items-center"><PacmanLoader color="#f59e0b" /></div>;
}
