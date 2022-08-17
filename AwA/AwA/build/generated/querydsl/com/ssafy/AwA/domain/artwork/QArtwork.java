package com.ssafy.AwA.domain.artwork;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QArtwork is a Querydsl query type for Artwork
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QArtwork extends EntityPathBase<Artwork> {

    private static final long serialVersionUID = -1342769222L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QArtwork artwork = new QArtwork("artwork");

    public final com.ssafy.AwA.domain.QBaseTimeEntity _super = new com.ssafy.AwA.domain.QBaseTimeEntity(this);

    public final NumberPath<Long> artwork_id = createNumber("artwork_id", Long.class);

    public final ListPath<com.ssafy.AwA.domain.attachment.Attachment, com.ssafy.AwA.domain.attachment.QAttachment> attachment_list = this.<com.ssafy.AwA.domain.attachment.Attachment, com.ssafy.AwA.domain.attachment.QAttachment>createList("attachment_list", com.ssafy.AwA.domain.attachment.Attachment.class, com.ssafy.AwA.domain.attachment.QAttachment.class, PathInits.DIRECT2);

    public final ListPath<com.ssafy.AwA.domain.comment.Comment, com.ssafy.AwA.domain.comment.QComment> comments = this.<com.ssafy.AwA.domain.comment.Comment, com.ssafy.AwA.domain.comment.QComment>createList("comments", com.ssafy.AwA.domain.comment.Comment.class, com.ssafy.AwA.domain.comment.QComment.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final StringPath description = createString("description");

    public final ListPath<String, StringPath> genre = this.<String, StringPath>createList("genre", String.class, StringPath.class, PathInits.DIRECT2);

    public final StringPath ingredient = createString("ingredient");

    public final BooleanPath is_recommend = createBoolean("is_recommend");

    public final NumberPath<Integer> is_sell = createNumber("is_sell", Integer.class);

    public final NumberPath<Integer> like_count = createNumber("like_count", Integer.class);

    public final ListPath<com.ssafy.AwA.domain.like.Likes, com.ssafy.AwA.domain.like.QLikes> likes = this.<com.ssafy.AwA.domain.like.Likes, com.ssafy.AwA.domain.like.QLikes>createList("likes", com.ssafy.AwA.domain.like.Likes.class, com.ssafy.AwA.domain.like.QLikes.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final QPurchaseArtwork purchase_artwork;

    public final ListPath<com.ssafy.AwA.domain.report.Report, com.ssafy.AwA.domain.report.QReport> report_list = this.<com.ssafy.AwA.domain.report.Report, com.ssafy.AwA.domain.report.QReport>createList("report_list", com.ssafy.AwA.domain.report.Report.class, com.ssafy.AwA.domain.report.QReport.class, PathInits.DIRECT2);

    public final com.ssafy.AwA.domain.user.QUser sell_user;

    public final StringPath title = createString("title");

    public final NumberPath<Integer> view_count = createNumber("view_count", Integer.class);

    public QArtwork(String variable) {
        this(Artwork.class, forVariable(variable), INITS);
    }

    public QArtwork(Path<? extends Artwork> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QArtwork(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QArtwork(PathMetadata metadata, PathInits inits) {
        this(Artwork.class, metadata, inits);
    }

    public QArtwork(Class<? extends Artwork> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.purchase_artwork = inits.isInitialized("purchase_artwork") ? new QPurchaseArtwork(forProperty("purchase_artwork"), inits.get("purchase_artwork")) : null;
        this.sell_user = inits.isInitialized("sell_user") ? new com.ssafy.AwA.domain.user.QUser(forProperty("sell_user"), inits.get("sell_user")) : null;
    }

}

