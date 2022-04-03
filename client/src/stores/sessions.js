import { ref, computed } from "vue";
import { defineStore } from "pinia";

function makeid(length) {
  let result = "";
  let resultFinal = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz^$ù*,;:!¨£%µ?./§&'_=²0123456789";
  const charactersLength = characters.length;
  const nomberInPart = 8;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  for (var i = 0; i <= result.length; i++) {
    if (!(i / nomberInPart).toString(10).split(".")[1]) {
      if (i !== 0) {
        let part = result
          .split("")
          .slice(i - nomberInPart, i)
          .join("");

        if (i !== result.length) {
          resultFinal += `[${part}]-`;
        } else {
          resultFinal += `[${part}]`;
        }
      }
    }
  }
  return resultFinal;
}

const useSessionsStore = defineStore("sessions", () => {
  const sessions = ref({
    id: {
      data: "",
      saveInSessions: true,
    },
    name: {
      data: "",
      saveInSessions: false,
    },
    config: {
      data: {
        logo_url:
          "https://media.discordapp.net/attachments/726112369456971918/960152316823097374/logo.png",
      },
      saveInSessions: false,
    },
  });

  const genId = () => {
    sessions.value.id.data = makeid(64);
  };

  const saveSessionsInVarSessions = () => {
    Object.keys(sessions.value).map((meta) => {
      if (
        !sessions.value[meta]["saveInSessions"] ||
        sessions.value[meta]["saveInSessions"] === false
      )
        return;
      sessionStorage.setItem(`dev-${meta}`, sessions.value[meta].data);
    });
  };

  /**
   *
   * @param {String} nameOfVar
   */
  const saveSessionsOneVar = (nameOfVar) => {
    sessionStorage.setItem(`dev-${nameOfVar}`, sessions.value[nameOfVar].data);
  };

  const getId = () => {
    return sessions.value.id.data;
  };

  const getConfig = () => {
    return sessions.value.config.data;
  };

  return {
    getters: {
      getId,
      getConfig,
    },
    setters: {},
    methods: {
      genId,
      saveSessionsInVarSessions,
      saveSessionsOneVar,
    },
  };
});

export default useSessionsStore;
