import { ref, computed } from "vue";
import { defineStore } from "pinia";

const useSessionsStore = defineStore("sessions", () => {
  const sessions = ref({});

  return {
    sessions,
  };
});

export default useSessionsStore;
