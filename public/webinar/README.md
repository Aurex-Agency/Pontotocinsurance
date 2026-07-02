# Webinar funnel assets

Drop your two files in this folder (or set the env vars below):

1. **Video**: `webinar.mp4`
   - Used by the `/webinarlink/watch` page.
   - Must be an MP4 (or a direct video URL) so seeking can be disabled.
     A YouTube/Vimeo embed cannot block fast-forwarding.
   - Override path with `NEXT_PUBLIC_WEBINAR_VIDEO_URL`.

2. **Free PDF**: `free-guide.pdf`
   - Delivered after the 60-second opt-in.
   - Override path with `NEXT_PUBLIC_WEBINAR_PDF_URL`.

After adding the files, commit them and redeploy.
