package com.ssafy.AwA.domain.artwork;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPurchaseArtwork is a Querydsl query type for PurchaseArtwork
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPurchaseArtwork extends EntityPathBase<PurchaseArtwork> {

    private static final long serialVersionUID = 398913913L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPurchaseArtwork purchaseArtwork = new QPurchaseArtwork("purchaseArtwork");

    public final com.ssafy.AwA.domain.QBaseTimeEntity _super = new com.ssafy.AwA.domain.QBaseTimeEntity(this);

    public final QArtwork artwork;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final NumberPath<Long> purchase_id = createNumber("purchase_id", Long.class);

    public final com.ssafy.AwA.domain.user.QUser purchase_user;

    public QPurchaseArtwork(String variable) {
        this(PurchaseArtwork.class, forVariable(variable), INITS);
    }

    public QPurchaseArtwork(Path<? extends PurchaseArtwork> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPurchaseArtwork(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPurchaseArtwork(PathMetadata metadata, PathInits inits) {
        this(PurchaseArtwork.class, metadata, inits);
    }

    public QPurchaseArtwork(Class<? extends PurchaseArtwork> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.artwork = inits.isInitialized("artwork") ? new QArtwork(forProperty("artwork"), inits.get("artwork")) : null;
        this.purchase_user = inits.isInitialized("purchase_user") ? new com.ssafy.AwA.domain.user.QUser(forProperty("purchase_user"), inits.get("purchase_user")) : null;
    }

}

