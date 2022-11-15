package com.example.climbingBear.domain.chat.dto;

import com.google.gson.JsonObject;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
@Data
@Slf4j
public class RoomManager {
    private Map<Long, JsonObject> users;
//    private int[] seatState;
//    private int seatCnt;
    private Long roomSeq;
    private List<Integer> characters;
    private boolean started = false;

    public RoomManager(){
        characters = Collections.synchronizedList(new ArrayList<Integer>());
        for(int i = 1; i <= 8; i++)
            characters.add(i);
        Collections.shuffle(characters);

        users = new ConcurrentHashMap<>();
//        seatState = new int[8];
//        seatCnt = 0;
    }
    public void addUser(Long userSeq, ChatRoomResDto message){
//        int character = 0;
//        if(users.get(userSeq)!=null) {
//            character = users.get(userSeq).get("character").getAsInt();
//            users.remove(userSeq);
//        }
//        else{
//            log.info("[Room {}] 새로운 유저 추가", roomSeq);
//            character = getCharacter();
//        }

        JsonObject user = new JsonObject();
        user.addProperty("nickname", message.getNickname());

        users.put(userSeq, user);
    }
}
