package com.ssafy.AwA.domain.report;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReport is a Querydsl query type for Report
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReport extends EntityPathBase<Report> {

    private static final long serialVersionUID = -2048828626L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReport report = new QReport("report");

    public final com.ssafy.AwA.domain.QBaseTimeEntity _super = new com.ssafy.AwA.domain.QBaseTimeEntity(this);

    public final StringPath category = createString("category");

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final NumberPath<Long> report_id = createNumber("report_id", Long.class);

    public final com.ssafy.AwA.domain.profile.QProfile report_profile;

    public final com.ssafy.AwA.domain.artwork.QArtwork reported_artwork;

    public QReport(String variable) {
        this(Report.class, forVariable(variable), INITS);
    }

    public QReport(Path<? extends Report> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReport(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReport(PathMetadata metadata, PathInits inits) {
        this(Report.class, metadata, inits);
    }

    public QReport(Class<? extends Report> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.report_profile = inits.isInitialized("report_profile") ? new com.ssafy.AwA.domain.profile.QProfile(forProperty("report_profile"), inits.get("report_profile")) : null;
        this.reported_artwork = inits.isInitialized("reported_artwork") ? new com.ssafy.AwA.domain.artwork.QArtwork(forProperty("reported_artwork"), inits.get("reported_artwork")) : null;
    }

}

