SELECT cs.id,
    ca.id AS id_career,
    ca.name AS name_career,
    su.id AS id_subject,
    su.name AS name_subject,
    cs.semester,
    cs.credits,
    cs.enable
   FROM carrersubjects cs
     JOIN careers ca ON ca.id = cs.id_career
     JOIN subjects su ON su.id = cs.id_subject;