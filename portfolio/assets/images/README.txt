This folder is for real project screenshots, if you'd like to use them.

Right now, the project cards on projects.html use a CSS-only gradient +
initial-letter "file preview" panel instead of a screenshot — no images
were provided, so this avoids linking to files that don't exist.

To swap in a real screenshot for a project:
  1. Add an image here, e.g. assets/images/fittrack.jpg
  2. In projects.html, replace that project's `.project-card-media` div
     with an <img src="assets/images/fittrack.jpg" alt="Screenshot of the
     FitTrack dashboard"> (write real, descriptive alt text for each one).
