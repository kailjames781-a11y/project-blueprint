# Animate the landing experience and add app downloads

## What will change
- Add restrained motion to the live implementation plan so it feels actively built, while preserving the existing “living specification” identity.
- Add a desktop-app download control in the first section with a version selector for macOS and Windows 64-bit.
- Keep the experience keyboard-accessible, responsive, and free of gradients or emoji.

## Interaction details
- The active plan row will pulse subtly, the progress indicator will move, and plan rows will enter in sequence.
- The download selector will clearly show the chosen operating system and use a separate “Download app” action.
- Since no download files or backend were provided, the control will demonstrate the download flow locally without connecting to a real installer.

## Verification
- Check desktop and mobile layouts, keyboard operation, reduced-motion behavior, and console/build health.
