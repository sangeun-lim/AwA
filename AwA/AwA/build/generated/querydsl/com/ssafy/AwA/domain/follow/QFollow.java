package com.ssafy.AwA.domain.follow;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFollow is a Querydsl query type for Follow
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFollow extends EntityPathBase<Follow> {

    private static final long serialVersionUID = -618298226L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFollow follow = new QFollow("follow");

    public final NumberPath<Long> follow_id = createNumber("follow_id", Long.class);

    public final com.ssafy.AwA.domain.profile.QProfile fromProfile;

    public final com.ssafy.AwA.domain.profile.QProfile toProfile;

    public QFollow(String variable) {
        this(Follow.class, forVariable(variable), INITS);
    }

    public QFollow(Path<? extends Follow> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFollow(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFollow(PathMetadata metadata, PathInits inits) {
        this(Follow.class, metadata, inits);
    }

    public QFollow(Class<? extends Follow> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.fromProfile = inits.isInitialized("fromProfile") ? new com.ssafy.AwA.domain.profile.QProfile(forProperty("fromProfile"), inits.get("fromProfile")) : null;
        this.toProfile = inits.isInitialized("toProfile") ? new com.ssafy.AwA.domain.profile.QProfile(forProperty("toProfile"), inits.get("toProfile")) : null;
    }

}

