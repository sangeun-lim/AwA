package com.ssafy.AwA.domain.like;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLikes is a Querydsl query type for Likes
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLikes extends EntityPathBase<Likes> {

    private static final long serialVersionUID = 2123096741L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLikes likes = new QLikes("likes");

    public final com.ssafy.AwA.domain.artwork.QArtwork artwork;

    public final NumberPath<Long> like_id = createNumber("like_id", Long.class);

    public final com.ssafy.AwA.domain.profile.QProfile profile;

    public QLikes(String variable) {
        this(Likes.class, forVariable(variable), INITS);
    }

    public QLikes(Path<? extends Likes> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLikes(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLikes(PathMetadata metadata, PathInits inits) {
        this(Likes.class, metadata, inits);
    }

    public QLikes(Class<? extends Likes> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.artwork = inits.isInitialized("artwork") ? new com.ssafy.AwA.domain.artwork.QArtwork(forProperty("artwork"), inits.get("artwork")) : null;
        this.profile = inits.isInitialized("profile") ? new com.ssafy.AwA.domain.profile.QProfile(forProperty("profile"), inits.get("profile")) : null;
    }

}

