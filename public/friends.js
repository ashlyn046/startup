async function loadSongs() {
  let songs = [];
  try {
    // Get the latest songs from the service
    //This line sends a fetch request to the /api/scores endpoint. The await keyword is used to wait for 
    //the response to come back before continuing to the next line.
    const response = await fetch('/api/songs');
    songs = await response.json();

    // Save the songs in case we go offline in the future
    localStorage.setItem('songs', JSON.stringify(songs));
  } catch {
    // If there was an error then just use the last saved scores
    const songsText = localStorage.getItem('songs');
    if (songsText) {
      songs = JSON.parse(songsText);
    }
  }

  displaySongs(songs);
}

function displaySongs(songs){
    //this is making the table body element equal to the table we already have in friends.html
    const tableBodyEl = document.querySelector('#songs');

      // check if tableBodyEl exists
  if (!tableBodyEl) {
    console.error('Table body element not found.');
    return;
  }

  
    //if there are somgs to add, here we add them
    if (songs.length) {
      for (const [i, song] of songs.entries()) {
        const userTdEl = document.createElement('td');
        const singerTdEl = document.createElement('td');
        const titleTdEl = document.createElement('td');
  
        //this is where we actually extract the user and song, we will have to add these !!! (at least the user)
        userTdEl.textContent = song.user;
        singerTdEl.textContent = song.singer;
        titleTdEl.textContent = song.title;
  
        const rowEl = document.createElement('tr');
        rowEl.appendChild(userTdEl);
        rowEl.appendChild(singerTdEl);
        rowEl.appendChild(titleTdEl);
  
        //error: cannot read property of null
        tableBodyEl.appendChild(rowEl);
      }
    } else {
      tableBodyEl.innerHTML = '<tr><td colSpan=2>No songs yet!</td></tr>'; //this didn't post :(
    }
  }
  
loadSongs();