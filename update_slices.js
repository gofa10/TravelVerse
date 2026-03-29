const fs = require('fs');

const files = [
  'frontend/src/Radux/Slices/hotelSlice.js',
  'frontend/src/Radux/Slices/carSlice.js',
  'frontend/src/Radux/Slices/cruiseSlice.js',
  'frontend/src/Radux/Slices/reservationSlice.js',
  'frontend/src/Radux/Slices/activitySlice.js',
  'frontend/src/Radux/Slices/cartSlice.js',
  'frontend/src/Radux/Slices/favoriteSlice.js',
  'frontend/src/Radux/Slices/restaurantSlice.js',
  'frontend/src/Radux/Slices/reviewSlice.js',
  'frontend/src/Radux/Slices/flightSlice.js',
  'frontend/src/Radux/Slices/tripSlice.js',
  'frontend/src/Radux/Slices/guideSlice.js',
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace thunks
  content = content.replace(
    /export const (\w+) = createAsyncThunk\(([^,]+),\s*async\s*\(([^)]*)\)\s*=>\s*\{([\s\S]*?)\}\);/g,
    (match, name, actionName, args, body) => {
      // If already has rejectWithValue, skip
      if (args.includes('rejectWithValue')) return match;
      
      const newArgs = args.trim() ? `${args}, { rejectWithValue }` : `_, { rejectWithValue }`;
      
      return `export const ${name} = createAsyncThunk(${actionName}, async (${newArgs}) => {\n  try {${body}  } catch (err) {\n    return rejectWithValue(err.response?.data?.message ?? 'Something went wrong');\n  }\n});`;
    }
  );

  // Replace extraReducers rejected cases
  content = content.replace(
    /\.addCase\(\w+\.rejected,\s*\(state(?:,\s*action)?\)\s*=>\s*\{([\s\S]*?)state\.error\s*=\s*(['"]?)(.*?)(['"]?);([\s\S]*?)\}\)/g,
    (match, body1, quote1, errorStr, quote2, body2) => {
      if (errorStr.includes('action.payload')) return match;
      // Get the original error string to use as fallback if we want, or rely on action payload
      const thunkNameMatch = match.match(/\.addCase\((\w+)\.rejected/);
      const thunkName = thunkNameMatch ? thunkNameMatch[1] : 'Unknown';
      
      return `.addCase(${thunkName}.rejected, (state, action) => {${body1}state.error = action.payload ?? action.error?.message ?? 'Something went wrong';${body2}})`;
    }
  );

  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});
console.log('All slices updated successfully.');
