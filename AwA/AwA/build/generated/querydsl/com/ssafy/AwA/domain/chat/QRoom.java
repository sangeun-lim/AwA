package com.ssafy.AwA.domain.chat;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRoom is a Querydsl query type for Room
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRoom extends EntityPathBase<Room> {

    private static final long serialVersionUID = -225825359L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRoom room = new QRoom("room");

    public final com.ssafy.AwA.domain.QBaseTimeEntity _super = new com.ssafy.AwA.domain.QBaseTimeEntity(this);

    public final ListPath<Message, QMessage> chat_log = this.<Message, QMessage>createList("chat_log", Message.class, QMessage.class, PathInits.DIRECT2);

    public final NumberPath<Integer> chat_partner_id = createNumber("chat_partner_id", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final com.ssafy.AwA.domain.artwork.QArtwork related_artwork;

    public final NumberPath<Long> room_id = createNumber("room_id", Long.class);

    public QRoom(String variable) {
        this(Room.class, forVariable(variable), INITS);
    }

    public QRoom(Path<? extends Room> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRoom(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRoom(PathMetadata metadata, PathInits inits) {
        this(Room.class, metadata, inits);
    }

    public QRoom(Class<? extends Room> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.related_artwork = inits.isInitialized("related_artwork") ? new com.ssafy.AwA.domain.artwork.QArtwork(forProperty("related_artwork"), inits.get("related_artwork")) : null;
    }

}

