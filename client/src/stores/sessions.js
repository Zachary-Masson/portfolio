import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

function makeId(length) {
  let result = "";
  let resultFinal = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz^$ù*,;:!¨£%µ?./§&'_=²0123456789";
  const charactersLength = characters.length;
  const numberInPart = 8;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  for (let i = 0; i <= result.length; i++) {
    if (!(i / numberInPart).toString(10).split(".")[1]) {
      if (i !== 0) {
        let part = result
          .split("")
          .slice(i - numberInPart, i)
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

const API = axios.create({baseURL: 'http://localhost:3000'})

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
        timeForSendAddView: 1
      },
      saveInSessions: false,
    },
    function: {
      data: {

      },
      saveInSessions: false
    }
  });

  const genId = () => {
    sessions.value.id.data = makeId(64);
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

  const addFunction = (name, func) => {
    sessions.value.function.data[name] = {};
    sessions.value.function.data[name] = func
  }

  const addViews = () => {
    setTimeout(() => {
      API.post('/utils/addViews', {});
    }, sessions.value.config.data.timeForSendAddView * 60 * 1000)
  }

  const getId = () => {
    return sessions.value.id.data;
  };

  const getConfig = () => {
    return sessions.value.config.data;
  };

  const getFunction = () => {
    return sessions.value.function.data;
  }

  return {
    getters: {
      getId,
      getConfig,
      getFunction
    },
    setters: {
      addFunction
    },
    methods: {
      genId,
      saveSessionsInVarSessions,
      saveSessionsOneVar,
      addViews
    },
  };
});

export default useSessionsStore;
