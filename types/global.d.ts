export {}; // Important for module augmentation

declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
      ) => void;
      // Add other snap methods if needed
    };
  }
}