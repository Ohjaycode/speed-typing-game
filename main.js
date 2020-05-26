// listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

function saveBookmark(e){
   //Get form values
   var siteName = document.getElementById('siteName').value;
   var siteUrl = document.getElementById('siteUrl').value;
   
   if (!siteName || !siteUrl){
      alert('please fill in the form');
      return false
   }

   var bookmark = {
       name:siteName,
       url:siteUrl
   }
   /*
   //Local storage Test
   localStorage.setItem('test','hello world')
   localStorage.removeItem('test')
   console.log(localStorage.getItem('test'))*/
    //Prevent form from submitting



    //test if bookmark is null
    if(localStorage.getItem('bookmarks') === null){
    //init array 
    var bookmarks = [];
    //Add to array
    bookmarks.push(bookmark)
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }else {
        //Get bookmarks form local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //add bookmark to arraay
        bookmarks.push(bookmark);
        //reset to local storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }

    document.getElementById('myForm').reset()
    fetchBookmarks();

    e.preventDefault();
}

function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through bookmarks
    for(var i = 0;i <bookmarks.length; i++){
        if(bookmarks[i].url == url){
           //remove from array
           bookmarks.splice(i, 1)
        }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    //refetchbookmarks
    fetchBookmarks();
}


function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //get ouput id
    var bookmarksResults = document.getElementById('bookmarksResults')
    //build output
    bookmarksResults.innerHTML = '';
    for( var i = 0; i<bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResults.innerHTML += '<div class = "well border p-1 m-1">' +
                                      '<h3>'+name+
                                      '<a class="btn btn-primary p-1 m-2 xs" target="_blank" href ="'+url+'">visit</a> '+
                                      '<a onclick = "deleteBookmark(\''+url+'\')"class="btn btn-danger p-1 m-2 xs"  href ="#">delete</a> '
                                      '</h3>'+
                                      '</div>';
    }
}