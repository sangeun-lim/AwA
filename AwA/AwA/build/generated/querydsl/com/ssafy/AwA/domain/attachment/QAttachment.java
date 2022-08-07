package com.ssafy.AwA.domain.attachment;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAttachment is a Querydsl query type for Attachment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAttachment extends EntityPathBase<Attachment> {

    private static final long serialVersionUID = -1867357490L;

    public static final QAttachment attachment = new QAttachment("attachment");

    public final com.ssafy.AwA.domain.QBaseTimeEntity _super = new com.ssafy.AwA.domain.QBaseTimeEntity(this);

    public final NumberPath<Long> artwork_id = createNumber("artwork_id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> file_id = createNumber("file_id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final StringPath type = createString("type");

    public final StringPath url = createString("url");

    public QAttachment(String variable) {
        super(Attachment.class, forVariable(variable));
    }

    public QAttachment(Path<? extends Attachment> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAttachment(PathMetadata metadata) {
        super(Attachment.class, metadata);
    }

}

