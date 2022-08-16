package com.ssafy.AwA.domain.user;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -1506308082L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUser user = new QUser("user");

    public final com.ssafy.AwA.domain.QBaseTimeEntity _super = new com.ssafy.AwA.domain.QBaseTimeEntity(this);

    public final DatePath<java.time.LocalDate> birth = createDate("birth", java.time.LocalDate.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final StringPath email = createString("email");

    public final StringPath email_code = createString("email_code");

    public final BooleanPath gender = createBoolean("gender");

    public final BooleanPath is_manager = createBoolean("is_manager");

    public final BooleanPath is_seller = createBoolean("is_seller");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final StringPath nickname = createString("nickname");

    public final StringPath password = createString("password");

    public final com.ssafy.AwA.domain.profile.QProfile profile;

    public final ListPath<Long, NumberPath<Long>> recommandArtworks = this.<Long, NumberPath<Long>>createList("recommandArtworks", Long.class, NumberPath.class, PathInits.DIRECT2);

    public final StringPath refreshToken = createString("refreshToken");

    public final ListPath<String, StringPath> roles = this.<String, StringPath>createList("roles", String.class, StringPath.class, PathInits.DIRECT2);

    public final ListPath<com.ssafy.AwA.domain.artwork.Artwork, com.ssafy.AwA.domain.artwork.QArtwork> sell_list = this.<com.ssafy.AwA.domain.artwork.Artwork, com.ssafy.AwA.domain.artwork.QArtwork>createList("sell_list", com.ssafy.AwA.domain.artwork.Artwork.class, com.ssafy.AwA.domain.artwork.QArtwork.class, PathInits.DIRECT2);

    public final NumberPath<Long> user_id = createNumber("user_id", Long.class);

    public QUser(String variable) {
        this(User.class, forVariable(variable), INITS);
    }

    public QUser(Path<? extends User> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUser(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUser(PathMetadata metadata, PathInits inits) {
        this(User.class, metadata, inits);
    }

    public QUser(Class<? extends User> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.profile = inits.isInitialized("profile") ? new com.ssafy.AwA.domain.profile.QProfile(forProperty("profile"), inits.get("profile")) : null;
    }

}

