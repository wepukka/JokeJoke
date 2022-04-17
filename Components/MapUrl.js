const mapUrl = (categories, flags, length) => {

  let categoryList = [];
  let categoryUrl = "";

  let flagList = [];
  let flagUrl = "";

  let lengthUrl = "";

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
    flagUrl = "?blacklistFlag=" + flagList.join(",");
    lengthUrl = lengthUrl.replace("?", "&");
  }

  let url = categoryUrl + flagUrl + lengthUrl;
  console.log(url);
};

export default mapUrl;
