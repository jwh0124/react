export const toast = {
  success: (message: string) => {
    console.log("✅ SUCCESS:", message);
    alert(`✅ ${message}`);
  },
  error: (message: string) => {
    console.error("❌ ERROR:", message);
    alert(`❌ ${message}`);
  },
  info: (message: string) => {
    console.info("ℹ️ INFO:", message);
    alert(`ℹ️ ${message}`);
  },
};
