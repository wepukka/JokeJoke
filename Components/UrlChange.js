export default function UrlChange (categories,flags,length) {


  const mapCategories = () => {

    let categoryList = [];
    let categoryUrl = "";
  
    // CATEGORIES
    categories.map((data) => {
      if (data.isChecked == true) {
        categoryList.push(data.text);
      }
    });
  
    if (categoryList.length > 0) {
      categoryUrl = categoryList.join(",");
    } else {
      categoryUrl = "Any";
    }
    return categoryUrl
  }


  let flagList = [];
  let flagUrl = "";
  let lengthUrl = "";
  
  // FLAGS
  flags.map((data) => {
    if (data.isChecked == true) {
      flagList.push(data.text);
    }
  });

  // LENGTH
  if (length[0].isChecked && !length[1].isChecked) {
    lengthUrl = "?type=single";
  } else if (!length[0].isChecked && length[1].isChecked) {
    lengthUrl = "?type=twopart";
  } else {
    lengthUrl = "";
  }

  if (flagList.length > 0) {
    flagUrl = "?blacklistFlags=" + flagList.join(",");
    lengthUrl = lengthUrl.replace("?", "&");
  }

  let categoryUrl = mapCategories()
  return "https://v2.jokeapi.dev/joke/"+ categoryUrl + flagUrl + lengthUrl;
};
