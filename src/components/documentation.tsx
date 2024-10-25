import Link from "next/link";

export default function Documentation() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">
        API Documentation -{" "}
        <Link
          href="https://github.com/sayeed205/apple-lyrics"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-600"
        >
          Source
        </Link>
      </h2>
      <p>
        This API provides lyrics from Apple Music from Apple Music URL or a
        music ID. There is only one endpoint available:
      </p>
      <div className="bg-muted p-4 rounded-md">
        <code className="text-sm">/api</code>
      </div>
      <h3 className="text-xl font-semibold mt-4">Query Parameters</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>url</strong>: A valid Apple Music URL
          <br />
          <em className="text-sm">
            Example:
            https://music.apple.com/in/album/never-gonna-give-you-up/1559523357?i=1559523359
            https://music.apple.com/in/song/never-gonna-give-you-up/1559523359
          </em>
        </li>
        <li>
          <strong>id</strong>: A valid music ID (numeric string)
          <br />
          <em className="text-sm">Example: 1559523359</em>
        </li>
      </ul>
      <p>
        You must provide either the <code>url</code> or <code>id</code>{" "}
        parameter, but not both.
      </p>
      <h3 className="text-xl font-semibold mt-4">Response Format</h3>
      <p>The API returns a JSON object with the following structure:</p>
      <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
        <code>
          {`{
  "success": true,
  "message": "Lyrics Found",
  "status": 200, 
  "data": "<ttml>..."
}
`}
        </code>
      </pre>
      <h3 className="text-xl font-semibold mt-4">Error Handling</h3>
      <p>
        The API will return appropriate error messages for invalid inputs,
        missing parameters, or server errors. Always check the response status
        code and handle errors accordingly in your application.
      </p>
    </div>
  );
}
