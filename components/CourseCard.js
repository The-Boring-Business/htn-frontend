import React from "react";
import { useState, useEffect } from "react";

const CourseCard = ({ level, name, title }) => {
  const [gradient, setGradient] = useState({});
  const [icon, setIcon] = useState("");

  const themes = [
    {
      name: "Budget",
      gradient:
        {backgroundImage: 'linear-gradient(-60deg, #ff5858 0%, #f09819 100%)'},
      icon: "ri-file-list-3-fill",
    },
    {
      name: "Taxes",
      gradient:
        {backgroundImage: 'linear-gradient(to top, #0ba360 0%, #3cba92 100%)'},
      icon: "ri-bank-fill",
    },
    {
      name: "CashFlow",
      gradient:
        {backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'},
      icon: "ri-money-dollar-circle-fill",
    },
    {
      name: "CreditScore",
      gradient:
        {backgroundImage: 'linear-gradient(-225deg, #A445B2 0%, #D41872 52%, #FF0066 100%)'},
      icon: "ri-scales-3-fill",
    },
  ];

  const themeSelect = () => {
    themes.map((theme) => {
      if (theme.name == name) {
        setGradient(theme.gradient);
        console.log("🚀 ~ file: CourseCard.js ~ line 42 ~ themes.map ~ theme.gradient", theme.gradient)
        setIcon(theme.icon);
      }
    });
  };

  useEffect(() => {
    themeSelect();
  }, []);

  return (
    <div className="p-4 w-64 rounded-lg text-white h-42 flex flex-col justify-between" style={gradient}>
      
        <p className="text-sm font-semi-bold uppercase tracking-wide mb-4">
          {name} • {level}
        </p>
        <div className="">
          <div className="text-4xl font-medium">
            <i className={icon}></i>
          </div>
          <p className="font-bold text-2xl">{title}</p>
        </div>
    
    </div>
  );
};

export default CourseCard;
