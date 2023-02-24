import { CategoryColor } from "./Enums";

const Colors = {
  app: {
    //basics
    white: 'rgb(255,255,255)',
    black: 'rgb(0,0,0)',
    green: 'rgb(0,255,0)',
    yellow: 'rgb(255,255,0)',
    darkGray: 'rgb(70,70,70)',
    red:'rgb(255,0,0)',
    blue:'rgb(0,0,255)',
    mediumGreen:'rgb(64, 179, 95)',
    

    text: 'rgb(0,0,0)',
    background: 'rgb(255,255,255)',
    tint: 'rgb(108,196,173)',
    tintGreen: 'rgb(85, 177, 135)',
    secondaryTint: 'rgb(200,243,229)',
    tabIconDefault: 'rgb(204,204,204)',
    gray: 'rgb(170,170,170)',
    currencyGreen: 'rgb(82, 140, 73)',
    yellowStar:'rgb(254, 226, 65)',
    redCancel:'rgb(194, 82, 70)',
    defaultBackgroundGray:'rgb(242, 242, 242)',


    trasparent7White:'rgba(255,255,255,0.7)',
    trasparent3Green:'rgba(50,255,81,0.3)',
    


    //categories
    catTheme_gray: 'rgb(155, 155, 155)',
    catTheme_darkGray: 'rgb(103, 103, 103)',
    catTheme_blue: 'rgb(97,130,194)',
    catTheme_darkBlue: 'rgb(61,94,157)',
    catTheme_orange: 'rgb(182, 135, 108)',
    catTheme_darkOrange: 'rgb(141, 93, 64)',
    catTheme_yellow: 'rgb(184, 172, 98)',
    catTheme_darkYellow: 'rgb(139, 127, 56)',
    catTheme_purple: 'rgb(175, 133, 159)',
    catTheme_darkPurple: 'rgb(137, 83, 116)',

  }
};

function GetCategoryColor(catColor?: CategoryColor, isSecondary?: boolean): string {
  switch (catColor) {
    case CategoryColor.blue:
      return isSecondary
        ? Colors.app.catTheme_darkBlue
        : Colors.app.catTheme_blue;
    case CategoryColor.orange:
      return isSecondary
        ? Colors.app.catTheme_darkOrange
        : Colors.app.catTheme_orange;
    case CategoryColor.yellow:
      return isSecondary
        ? Colors.app.catTheme_darkYellow
        : Colors.app.catTheme_yellow;
    case CategoryColor.purple:
      return isSecondary
        ? Colors.app.catTheme_darkPurple
        : Colors.app.catTheme_purple;
    default:
      return isSecondary
        ? Colors.app.catTheme_darkGray
        : Colors.app.catTheme_gray;
  }
}

export {Colors, GetCategoryColor}