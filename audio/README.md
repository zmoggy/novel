# Audio Files for Forest Farm Game

This folder contains music and sound effects for the game.

## Directory Structure

- `music/` - Background music tracks
- `sfx/` - Sound effects

## Required Audio Files

### Background Music (`music/` folder)
You need the following music tracks (MP3 format recommended):

1. **main_theme.mp3** - Main farming theme (upbeat, peaceful)
2. **farming.mp3** - For farming activities (calm, repetitive)
3. **dialogue.mp3** - For NPC dialogues (soft, emotional)
4. **evening.mp3** - For evening/night time (mellow, relaxing)

### Sound Effects (`sfx/` folder)
You need the following sound effects:

1. **water.mp3** - Watering can sound
2. **plant.mp3** - Planting/tilling soil sound
3. **harvest.mp3** - Harvesting crop sound
4. **talk.mp3** - NPC dialogue start sound
5. **gift.mp3** - Giving gift sound
6. **heart.mp3** - Relationship increase sound

## Where to Find Free Music & SFX

### Free Music Sources (Royalty-Free)
1. **Incompetech** (https://incompetech.com/)
   - Search for: "Pastoral", "Wallpaper", "Carefree"
   - License: Creative Commons (attribution required)

2. **FreePD** (https://freepd.com/)
   - Completely public domain
   - Search for farming/relaxing music

3. **Pixabay Music** (https://pixabay.com/music/)
   - Free for commercial use
   - No attribution required
   - Great for casual game music

4. **OpenGameArt.org** (https://opengameart.org/)
   - Specific to games
   - Various licenses (check each track)

### Free Sound Effects Sources
1. **Freesound.org** (https://freesound.org/)
   - Huge library of sound effects
   - Search for: "watering", "plant", "harvest", "footstep"
   - Various Creative Commons licenses

2. **Mixkit** (https://mixkit.co/free-sound-effects/)
   - Free sound effects
   - No attribution required

3. **Zapsplat** (https://www.zapsplat.com/)
   - Free with attribution
   - Good quality SFX

4. **OpenGameArt.org SFX** (https://opengameart.org/art-search-advanced?keys=&field_art_type_tid%5B%5D=13)
   - Game-specific sound effects

## Recommended Searches

### For Music:
- "peaceful farm music"
- "stardew valley style music"
- "harvest moon music"
- "acoustic pastoral"
- "light piano background"

### For SFX:
- "water splash short"
- "digging dirt"
- "plant rustle"
- "harvest chop"
- "menu select"
- "positive notification"

## Converting Audio Files

If you have files in other formats (WAV, OGG), you can convert them to MP3 using:

**Online Tools:**
- https://cloudconvert.com/
- https://online-audio-converter.com/

**Software:**
- Audacity (free, open-source)
- ffmpeg (command line tool)

## File Size Tips

For web games, keep audio files small:
- **Music**: 128 kbps MP3, 2-3 minutes looping
- **SFX**: 64-96 kbps MP3, under 2 seconds
- Use mono for SFX (smaller file size)
- Use stereo for music (better quality)

## Testing

Once you've added your audio files, the game will:
- ✅ Play main_theme.mp3 when you start the game
- ✅ Play sound effects when farming (water.mp3, plant.mp3, harvest.mp3)
- ✅ Audio controls (🎵 and 🔊 buttons) will mute/unmute audio
- ✅ Volume settings are saved to browser localStorage

## Placeholder Files

If you want to test the system without real audio, you can:
1. Create silent MP3 files
2. Use online tools like https://www.angio.net/personal/ad_noise.html
3. Or just ignore the console warnings until you have real audio

## License Notes

Always check the license of any audio you download:
- ✅ **CC0 / Public Domain**: Use freely, no attribution needed
- ✅ **CC-BY**: Use freely, attribution required
- ⚠️ **CC-BY-SA**: Use freely, must share under same license
- ❌ **Commercial use prohibited**: Don't use for games you might sell

Have fun making your game sound amazing! 🎵
