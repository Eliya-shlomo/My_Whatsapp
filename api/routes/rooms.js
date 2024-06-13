import { Router } from 'express';
import Room from '../models/room.js';
import dotenv from 'dotenv';
import User from '../models/User.js';
dotenv.config();

const router = Router();

router.post('/private', async (req, res) => {
  const { user1, user2 } = req.body;

  try {
    let room = await Room.findOne({ 
      participants: { $all: [user1, user2] }, 
      isPrivate: true 
    });

    if (!room) {
      room = new Room({ participants: [user1, user2] });
      await room.save();
    }

    res.status(200).json(room);
  } catch (error) {
    console.error('Error creating/getting private room:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/group', async (req, res) => {
  const { name, participants } = req.body;

  try {
    const room = new Room({ name, participants, isPrivate: false });
    await room.save();

    res.status(201).json(room);
  } catch (error) {
    console.error('Error creating group room:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});


router.post('/group/:roomId/add',async (req,res) =>{
    const {roomId} = req.params;
    const {userId} = req.body;

    try{
        const room = await Room.findById(roomId);
        const user = await User.findById(userId);

        if(!room || room.isPrivate){
            return res.status(404).json({message:'Group not found or it is a private room '});
        }

        if(room.participants.includes(userId)){
            return res.status(400).json({message: 'User already in the group'});
        }
        if(!user){
          return res.status(403).json({message:'user is not found on Database!'});
        }
        
        room.participants.push(userId);
        await room.save();

        res.status(200).json(room);
    }
    catch(error){
        console.error('error adding user to group room:', error);
        res.status(500).json({message: ' server error',error});
    }

}
)

export default router;
