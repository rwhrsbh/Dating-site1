<script>
    import { onMount } from 'svelte';
    
    let profiles = [];
    let currentPick = 0;
    let profileFromTheLeft, profileFromTheRight;
    let lastSelectedProfile = null;
    let gameStop = false;
    let showFullProfile = false;
    let usedProfiles = new Set();
    let selectedProfiles = [];
    let showLikedProfiles = false;
    let viewingProfile = null;
    
    onMount(async () => {
      try {
        const response = await fetch('/profiles');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        profiles = await response.json();
        selectProfiles();
      } catch (error) {
        console.error('Failed to load Profiles:', error);
      }
    });
    
    function selectProfiles() {
      if (currentPick === 0 || !lastSelectedProfile) {
        const availableProfiles = profiles.filter(p => !usedProfiles.has(p.id));
        const randomIndices = getRandomIndices(availableProfiles.length, 2);
        profileFromTheLeft = availableProfiles[randomIndices[0]];
        profileFromTheRight = availableProfiles[randomIndices[1]];
      } else {
        profileFromTheLeft = lastSelectedProfile;
        const availableProfiles = profiles.filter(p => !usedProfiles.has(p.id) && p.id !== lastSelectedProfile.id);
        if (availableProfiles.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableProfiles.length);
          profileFromTheRight = availableProfiles[randomIndex];
        } else {
          gameStop = true;
          return;
        }
      }
      usedProfiles.add(profileFromTheLeft.id);
      usedProfiles.add(profileFromTheRight.id);
    }
    
    function getRandomIndices(max, count) {
      const indices = new Set();
      while (indices.size < count && indices.size < max) {
        indices.add(Math.floor(Math.random() * max));
      }
      return Array.from(indices);
    }
    
    function selectProfile(profile) {
      lastSelectedProfile = profile;
      selectedProfiles = [...selectedProfiles, profile];
      currentPick++;
    
      if (currentPick < 5 && usedProfiles.size < profiles.length) {
        selectProfiles();
      } else {
        gameStop = true;
      }
    }
    
    function restart() {
      currentPick = 0;
      lastSelectedProfile = null;
      gameStop = false;
      showFullProfile = false;
      showLikedProfiles = false;
      usedProfiles.clear();
      selectedProfiles = [];
      viewingProfile = null;
      selectProfiles();
    }
  
    function viewFullProfile(profile = lastSelectedProfile) {
      viewingProfile = profile;
      showFullProfile = true;
      showLikedProfiles = false;
    }
  
    function viewLikedProfiles() {
      showLikedProfiles = true;
      showFullProfile = false;
      viewingProfile = null;
      selectedProfiles = [...new Map(selectedProfiles.map(item => [item.id, item])).values()];
    }
  
    function backToLikedProfiles() {
      showFullProfile = false;
      showLikedProfiles = true;
      viewingProfile = null;
    }
  </script>
  
  <main>
    <h1>Dating Site - Dating Game</h1>
    {#if gameStop}
      {#if showFullProfile}
        <div class="full-profile">
          <h2>{viewingProfile.name}, ID: {viewingProfile.id}</h2>
          <img src={viewingProfile.photo} alt={viewingProfile.name} />
          <div class="profile-info">
            <p><strong>Age:</strong> {viewingProfile.age}</p>
            <p><strong>Hobbies:</strong> {viewingProfile.bio}</p>
          </div>
          <button on:click={backToLikedProfiles}>Back to Liked Profiles</button>
          <button on:click={restart}>Play Again</button>
        </div>
      {:else if showLikedProfiles}
        <div class="liked-profiles">
          <h2>Your Liked Profiles</h2>
          {#each selectedProfiles as profile}
            <div class="profile">
              <img src={profile.photo} alt={profile.name} />
              <h3>{profile.name}, {profile.age}</h3>
              <p>{profile.bio}</p>
              <button on:click={() => viewFullProfile(profile)}>View Full Profile</button>
            </div>
          {/each}
          <button on:click={restart}>Play Again</button>
        </div>
      {:else}
        <div class="game-over">
          <h2>Game Over</h2>
          <p>Your final choice:</p>
          <div class="profile">
            <img src={lastSelectedProfile.photo} alt={lastSelectedProfile.name} />
            <h3>{lastSelectedProfile.name}, {lastSelectedProfile.age}</h3>
            <p>{lastSelectedProfile.bio}</p>
          </div>
          <button on:click={() => viewFullProfile()}>View Full Profile</button>
          <button on:click={viewLikedProfiles}>View Liked Profiles</button>
          <button on:click={restart}>Play Again</button>
        </div>
      {/if}
    {:else if profileFromTheLeft && profileFromTheRight}
      <div class="game">
        <h2>Round {currentPick + 1}</h2>
        <div class="profiles">
          <div on:click={() => selectProfile(profileFromTheLeft)}>
            <div class="profile">
              <img src={profileFromTheLeft.photo} alt={profileFromTheLeft.name} />
              <h3>{profileFromTheLeft.name}, {profileFromTheLeft.age}</h3>
              <p>{profileFromTheLeft.bio}</p>
            </div>
          </div>
          <div on:click={() => selectProfile(profileFromTheRight)}>
            <div class="profile">
              <img src={profileFromTheRight.photo} alt={profileFromTheRight.name} />
              <h3>{profileFromTheRight.name}, {profileFromTheRight.age}</h3>
              <p>{profileFromTheRight.bio}</p>
            </div>
          </div>
        </div>
        <p>Click on the profile you prefer!</p>
      </div>
    {:else}
      <h2>Loading Profiles...</h2>
    {/if}
  </main>
  
  <style>
    .profiles, .liked-profiles {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      margin-top: 20px;
    }
    .game-over, .full-profile, .liked-profiles {
      text-align: center;
    }
    button {
      margin: 20px 10px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
    .profile {
      width: 300px;
      text-align: center;
      margin: 10px;
    }
    .profile img {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }
    .full-profile img {
      width: 300px;
      height: 300px;
      object-fit: cover;
    }
    .profile-info {
      text-align: left;
      max-width: 600px;
      margin: 0 auto;
    }
    .profile-info p {
      margin: 5px 0;
    }
  </style>