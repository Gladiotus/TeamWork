const convert = (content) => {
	var a = document.createElement("a");
	var file = new Blob([JSON.stringify(content)], { type: "text/plain" });
	a.href = URL.createObjectURL(file);
	a.download = "json.txt";
	a.click();
};
export default convert;
