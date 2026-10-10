import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createClient } from '@supabase/supabase-js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Serve static frontend assets cleanly
app.use(express.static('public'));

// Connect to your live, persistent Supabase cloud database cluster layers
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Track all live concurrent socket profiles globally in active memory
const connectedHustlers = {};

io.on('connection', (socket) => {
    console.log(`📡 New device link request: ${socket.id}`);

    // Action: Sync profile stats from persistent table maps on account authorization
    socket.on('player_login', async (data) => {
        const { username, userId } = data; // Supabase user authentication metadata
        
        // Initialize active tracking state values inside cloud session containers
        connectedHustlers[socket.id] = {
            socketId: socket.id,
            userId: userId,
            username: username || 'Grinder',
            cash: 2000,
            stamina: 100,
            room: 'Mainland'
        };

        // Broadcast active player entry to everyone else sync channels instantly
        socket.emit('update_ui', connectedHustlers[socket.id]);
        
        // Pull down saved structural room items layout allocations from database layer maps
        if (supabaseUrl && supabaseKey) {
            const { data: dbItems } = await supabase
                .from('placed_furniture')
                .select('*')
                .eq('user_id', userId);
                
            if (dbItems) {
                socket.emit('sync_furniture_state', dbItems);
            }
        }
    });

    // Action: Real-time spatial coordination positioning asset deployment sync loops
    socket.on('place_furniture_action', async (data) => {
        const player = connectedHustlers[socket.id];
        if (!player) return;

        const { itemKey, tileX, tileY } = data;

        // Construct permanent data payload models structures
        const furnitureRecord = {
            user_id: player.userId,
            item_key: itemKey,
            tile_x: tileX,
            tile_y: tileY
        };

        // Write directly to your live production Supabase grid row records container layers
        if (supabaseUrl && supabaseKey) {
            await supabase.from('placed_furniture').insert([furnitureRecord]);
        }

        // Emit asset position event packets out to all other connected game instances instantly
        io.emit('furniture_spawned_broadcast', {
            username: player.username,
            itemKey,
            tileX,
            tileY
        });
    });

    socket.on('disconnect', () => {
        console.log(`❌ Device connection disconnected safely: ${socket.id}`);
        delete connectedHustlers[socket.id];
    });
});

// Production environment variable cloud injection pipeline port allocation hook
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Naija Hustle Engine broadcasting securely on public port network standard: ${PORT}`);
});
