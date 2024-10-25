# Apple Lyrics

To run Locally add .env `MEDIA_USER_TOKEN` and run `bun dev`.

### Docs

This API provides lyrics from Apple Music, either by providing an Apple Music URL or a music ID. Only one endpoint is available:

```plaintext
/api
```

### Query Parameters

- **url**: A valid Apple Music URL  
  *Example:*  
  `https://music.apple.com/in/album/never-gonna-give-you-up/1559523357?i=1559523359`  
  `https://music.apple.com/in/song/never-gonna-give-you-up/1559523359`

- **id**: A valid music ID (numeric string)  
  *Example:*  
  `1559523359`

**Note:** You must provide either the `url` or `id` parameter, but not both.

### Response Format

The API returns a JSON object with the following structure:

```json
{
  "success": true,
  "message": "Lyrics Found",
  "status": 200,
  "data": "<ttml>..."
}
```

### Error Handling

The API will return appropriate error messages for invalid inputs, missing parameters, or server errors. Always check the response status code and handle errors accordingly in your application.
