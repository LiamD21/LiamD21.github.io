// Initiating background
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.height = window.outerHeight;
canvas.width = window.outerWidth;

ctx.fillRect(0, 0, 100, 100);