import itemInfo from "@/utils/itemInfo";
 
const colors = {
  green: {
    base: "#7CBC29",
    shadow: "#678243",
    dark: "#65A512",
    light: "#BEE689",
    text: "#3F6013",
    img:"/images/work.svg",
    loc:"right",
    info: [...itemInfo[1]],
  },
  red: {
    base: "#FF0505",
    shadow: "#CC2F2F",
    dark: "#D70000",
    light: "#FFC1C1",
    text: "#9B0000",
    img:"/images/play.svg",
    loc:"top",
    info: [...itemInfo[3]],
  },
  yellow: {
    base: "#FFAB03",
    shadow: "#CC8802",
    dark: "#CB8700",
    light: "#FFD98E",
    text: "#B1842B",
    img:"/images/win.svg",
    loc:"left",
    info: [...itemInfo[2]]
  },
};
export default colors;